package com.api.abs.recommend;
import com.api.abs.book.book;
import com.api.abs.book.bookRepository;
import com.api.abs.order.order;
import com.api.abs.order.orderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class recmndBooks {
    private final com.api.abs.book.bookRepository bookRepository;
    private final com.api.abs.order.orderRepository orderRepository;

    @Autowired
    public recmndBooks(com.api.abs.book.bookRepository bookRepository, com.api.abs.order.orderRepository orderRepository) {
        this.bookRepository = bookRepository;
        this.orderRepository = orderRepository;
    }

    public List<book> forAllUsers (){
        List<book> allBooks = bookRepository.findAvailableBooks();
        return allBooks;
    }
    public List<book> signedInUser(Long userId){
        List<order> prevOrders = orderRepository.search(userId);
        List<book> allBooks = bookRepository.findAvailableBooks();
        int track=0;
        for(int i = 0; i<prevOrders.size();i++){
            order getBookID = prevOrders.get(i);
            book getBookInfo = bookRepository.findBookById((getBookID.getBook_id()));
            List<book> basedOnAuthor = bookRepository.findByAuthor(getBookInfo.getAuthor());
            List<book> basedOnDept = bookRepository.findByDept(getBookInfo.getDepartment());
            if(basedOnAuthor.size()>0 & basedOnDept.isEmpty()) {
                if(i==0) {
                    for (com.api.abs.book.book book : basedOnAuthor) {
                        allBooks.add(track, book);
                        track++;
                    }
                }else{
                    if(!getBookID.getBook_id().equals(prevOrders.get(i - 1).getBook_id())) {
                        for (com.api.abs.book.book book : basedOnAuthor) {
                            allBooks.add(track, book);
                            track++;
                        }
                    }
                }
            }else if(basedOnAuthor.size()>0 & basedOnDept.size()>0) {
                if(i==0) {
                    for (book value : basedOnAuthor) {
                        allBooks.add(track, value);
                    }
                    for (com.api.abs.book.book book : basedOnDept) {
                        allBooks.add(track, book);
                        track++;
                    }
                }else{
                    if(!getBookID.getBook_id().equals(prevOrders.get(i - 1).getBook_id())) {
                        for (book value : basedOnAuthor) {
                            allBooks.add(track, value);
                            track++;
                        }
                        for (com.api.abs.book.book book : basedOnDept) {
                            allBooks.add(track, book);
                            track++;
                        }
                    }
                }
            }
        }
        //removing redundant book recommendations.
        for(int j =0; j<allBooks.size();j++){
            for(int k =j+1; k<allBooks.size();k++){
                if(allBooks.get(j).getId().equals(allBooks.get(k).getId())){
                    allBooks.remove(k);
                    k--;
                }
                //else if(allBooks.size()>track){
//                    System.out.println(track+ "    "+ allBooks.size() +"___________________________________________________________________________________________________________________________________________________________________________");
//                    allBooks.remove(allBooks.size()-1);
//                }
            }
        }
        return allBooks;
    }
}
