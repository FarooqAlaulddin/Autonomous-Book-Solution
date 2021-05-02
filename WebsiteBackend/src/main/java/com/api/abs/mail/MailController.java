package com.api.abs.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import java.nio.file.FileSystems;
import java.nio.file.Path;

@RestController
@RequestMapping(path = "abs")
public class MailController {

    @Autowired
    private EmailService emailService;

    @GetMapping(value = "/sendmail")
    public String orderNotification(){

        //emailService.sendMail("mralemamy@gmail.com", "Test Subject", "Test mail");
        String path = "C:\\xampp\\htdocs\\abs\\qrcodes\\QRCode_"+60+".png";

//        String body = "" +
//                "<h1>Thank you for placing your order!</h1>" +
//                "<h3>Your order is ready for pick up at the selected time-slot.</h3>" +
//                "<p>You can use your one-time BR Code to checkout your book. Please be aware of your pickup time period as your BR Code will not work if it was use outside the selected time-slot</p>" +
//                "<br/>" +
//                "<p>Please Stay safe, wear your mask, and keep distance!</p>"
//                + "<";

        String body = "<h2 style=\"text-align: center;\">Thank you for your Order</h2>" +
                "<h4 style=\"text-align: center;\">Your order is ready for pick up at the selected time-slot.</h4>" +
                "<p>You can use your one-time BR Code to checkout your book. Please be aware of your pickup time period as your BR Code will not work if it was use outside the selected time-slot.</p>" +
                "<p>&nbsp;</p>" +
                "<pre><span style=\"color: #ff0000;\">Please Stay safe, wear your mask, and keep distance! <br /><br /><br /><br /><br /></span><em><span style=\"color: #000000;\">Automation Book Solution (ABS) Family<br /></span></em><span style=\"color: #ff0000;\"><br /><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://i.ibb.co/RCYGBbK/ABS-Logo.png\" alt=\"Information Poster\" width=\"382\" height=\"382\" /><br /></span></pre>"+
                "";




        emailService.sendMailWithAttachment("mralemamy@gmail.com","New Order Notification", body, path);

        return "Good";
    }
}