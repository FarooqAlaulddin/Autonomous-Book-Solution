package com.api.abs.order;


import com.api.abs.book.book;
import com.api.abs.book.bookService;
import com.api.abs.mail.EmailService;
import com.api.abs.user.DAOUser;
import com.api.abs.user.userService;
import com.google.zxing.WriterException;
import org.aspectj.weaver.ast.And;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import com.api.abs.qrcode.qrCodeGenerator;

import java.io.IOException;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "abs")
public class orderController {

    @Autowired
    com.api.abs.order.orderRepository orderRepository;
    @Autowired
    com.api.abs.book.bookRepository bookRepository;

    @Autowired
    userService userService;

    @Autowired
    EmailService EmailService;

    //Get All previous orders of the user
    @GetMapping(path ="/myorders/{userId}")
    public List<order> get(@PathVariable Long userId) {
        List<order> getOrders = orderRepository.search(userId);
        if(getOrders.isEmpty()){
            throw new IllegalStateException("NO ORDERS FOUND");
        }else {
            return getOrders;
        }
    }
    //get Checkedout orders only
    @GetMapping(path ="/mycheckedoutorders/{userId}")
    public List<order> getCheckedoutOrders(@PathVariable Long userId) {
        List<order> getOrders = orderRepository.getCheckedoutOrders(userId);
        if(getOrders.isEmpty()){
            throw new IllegalStateException("NO ORDERS FOUND");
        }else {
            return getOrders;
        }
    }
    //get returned orders only
    @GetMapping(path ="/myreturnedorders/{userId}")
    public List<order> getReturnedOrders(@PathVariable Long userId) {
        List<order> getOrders = orderRepository.getReturnedOrders(userId);
        if(getOrders.isEmpty()){
            throw new IllegalStateException("NO ORDERS FOUND");
        }else {
            return getOrders;
        }
    }

    //Get previous order of the user
    @GetMapping(path ="/cart/{userId}")
    public List<order> cart(@PathVariable Long userId) {
        List<order> getOrders = orderRepository.cart(userId);
        if(getOrders.isEmpty()){
            throw new IllegalStateException("NO ORDERS FOUND");
        }else {
            return getOrders;
        }
    }
    //Add to the cart
    @PostMapping(path ="/addToCart/{userId}/{bookId}")
    public order addToCart(@PathVariable("userId") Long id, @PathVariable("bookId") Long bookId, @RequestBody order newOrder) {

        newOrder.setBook_id(bookId);
        newOrder.setUser_id(id);
        bookService updateBook = new bookService(bookRepository);
        newOrder.setBookName(updateBook.getBookByID(bookId).get().getTitle());
        updateBook.updateBookQuantity(bookId, -1);
        return orderRepository.save(newOrder);

//        List dateTrack = orderRepository.searchByDate(newOrder.getPickup_date());
//        List startTime = orderRepository.searchByTime(newOrder.getPickup_time());
//        List endTime = orderRepository.searchByTimeEnd(newOrder.getPickup_time_end());
//
//        if (dateTrack.isEmpty()) {
//            bookService updateBook = new bookService(bookRepository);
//            updateBook.updateBookQuantity(bookId, -1);
//            return orderRepository.save(newOrder);
//        }else if(startTime.isEmpty() & endTime.isEmpty() ){
//            bookService updateBook = new bookService(bookRepository);
//            updateBook.updateBookQuantity(bookId, -1);
//            return orderRepository.save(newOrder);
//        }else if(startTime.size()>=1){
//            for(int j = 0; j<dateTrack.size();j++) {
//                for (int i = 0; i < startTime.size(); i++) {
//                    Object[] orderTimeFetch = (Object[]) startTime.get(i);
//                    Object[] orderDateFetch = (Object[]) dateTrack.get(j);
//                    if (orderTimeFetch[0].equals(orderDateFetch[0])) {
//                        throw new IllegalStateException("Time Taken: Please choose a different time and Date!");
//                    }else if (j==dateTrack.size()-1 & i == startTime.size()-1){
//                        bookService updateBook = new bookService(bookRepository);
//                        updateBook.updateBookQuantity(bookId, -1);
//                        return orderRepository.save(newOrder);
//                    }
//                }
//            }
//            throw new IllegalStateException("DATE TIME NOT MATCHED");
//        } else {
//            throw new IllegalStateException("Time Taken: Please choose a different time and Date!");
//        }

    }
    //place an order
    @PostMapping(path ="/order/{orderId}")
    public byte[]  save(@PathVariable("orderId") Long id, @RequestBody order newOrder ) {

        Optional<order> order = orderRepository.findById(id);
        DAOUser user = userService.getUserById(order.get().getUser_id());

        if (order.isPresent()) {
            order orderUpdate = order.get();
            if (orderUpdate.getIs_checkedout() ==0 ) {
                orderUpdate.setIs_checkedout(1);
                if(dateTimeCheck(newOrder)==true) {
                    orderUpdate.setPickup_date(newOrder.getPickup_date());
                    orderUpdate.setPickup_time(newOrder.getPickup_time());
                    orderUpdate.setPickup_time_end(newOrder.getPickup_time_end());
                    book getBookInfo = bookRepository.findBookById(orderUpdate.getBook_id());
                    qrCodeGenerator qrCode = new qrCodeGenerator();

                    try {
                        orderRepository.save(orderUpdate);
                        byte[] i = qrCode.getQRCodeImage(getBookInfo.getTitle(), orderUpdate.getId());
                        EmailService.OrderNotification(id,user,order);

                        return i;
                    } catch (WriterException e) {
                        throw new IllegalStateException("Could not generate QR Code, WriterException!");
                    } catch (IOException e) {
                        throw new IllegalStateException("Could not generate QR Code, IOException!");
                    }
                }else{
                    throw new IllegalStateException("Please Choose Valid Time and Date!");
                }

                //return orderRepository.save(orderUpdate);
            }else {
                throw new IllegalStateException("Book was already checked-out!");
            }
        } else {
            throw new IllegalStateException("Book was NOT added to cart!");
        }
    }

    public boolean dateTimeCheck(order newOrder){
        if(newOrder.getPickup_date()==null || newOrder.getPickup_time()==null || newOrder.getPickup_time_end()==null){
            System.out.println("getPickup_date: "+newOrder.getPickup_date());
            System.out.println("newOrder.getPickup_time(): "+newOrder.getPickup_time());
            System.out.println("newOrder.getPickup_time_end(): "+newOrder.getPickup_time_end());

            return false;
        }else{
            // if isFree == 1 that means a match is found in db
            // if isFree == 0 you can use the provided time.
            Integer isFree = orderRepository.searchByTimeAndDate(newOrder.getPickup_date(),newOrder.getPickup_time(),newOrder.getPickup_time_end());

            if(isFree == 0) return true;
            else return false;

        }

    }
    @PostMapping(path ="/freeSlots")
    public List<freeSlots> freeSlots(@RequestBody freeSlots obj){

        List<order> takenSlotsInProvidedDate = orderRepository.searchByDate(obj.getDate());
        System.out.println(takenSlotsInProvidedDate.size());
        List<freeSlots> freeSlots = new ArrayList<>();

        LocalTime open = LocalTime.of(0,0,0);
        LocalTime close = LocalTime.of(0,9,59);

        LocalTime closeTime = LocalTime.of(23,59,59);

        while (close.isBefore(closeTime)){


            freeSlots temp = new freeSlots(obj.getDate(),open,close);

            takenSlotsInProvidedDate.forEach( order -> {
//                System.out.print(order.getPickup_time().toLocalTime());
//                System.out.print(' ');
//                System.out.println(temp.getPickup_time());

                if(order.getPickup_time().toLocalTime().equals(temp.getPickup_time())

                  ){
                      temp.setTaken(1);
                      //System.out.println(temp.getTaken());
                  }
            });

            freeSlots.add(temp);

            open = open.plusMinutes(10);
            close = close.plusMinutes(10);

        }

        return freeSlots;
    }


    //Get QR CODE
    @GetMapping(path ="/qrcode/{orderId}")
    public String qrCode(@PathVariable Long orderId) {
        String imagePath ="C:\\xampp\\htdocs\\abs\\qrcodes\\QRCode_"+orderId+".png";
        return imagePath;
    }
    @PostMapping(path ="/admin/{orderId}")
    public order bookReturned(@PathVariable("orderId") Long id) {
        Optional<order> order = orderRepository.findById(id);
        if(order.isPresent()) {
            order orderUpdate = order.get();
            bookService updateBook = new bookService(bookRepository);
            updateBook.updateBookQuantity(orderUpdate.getBook_id(), 1);
            orderUpdate.setIs_returned(1);
            orderUpdate.setIs_checkedout(0);
            return orderRepository.save(orderUpdate);
        }else {
            throw new IllegalStateException("NO ORDERS WERE FOUND");
        }
    }

    @PostMapping(path ="/removeFromCart/{userId}/{bookId}")
    public boolean removeFromCart(@PathVariable("userId") Long userId, @PathVariable("bookId") Long bookId){
        Optional<order> order = orderRepository.findByOrderIdUserId(userId,bookId);
        if(order.isPresent()) {
            order orderUpdate = order.get();
            //bookService updateBook = new bookService(bookRepository);

            Optional<book> book  =  bookRepository.findById(orderUpdate.getBook_id());
            if(book.isPresent()) {
                book bookQuantity = book.get();
                bookQuantity.setQuantity(bookQuantity.getQuantity() + 1);
                bookRepository.save(bookQuantity);
            }else {
                throw new IllegalStateException("BOOK NOT FOUND");
            }
            orderRepository.delete(orderUpdate);
            return true;
        }
        return false;
    }

}
