package com.api.abs.mail;

import com.api.abs.order.order;
import com.api.abs.user.DAOUser;

import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.internet.*;
import java.io.File;
import java.util.Locale;
import java.util.Optional;

@Service
@EnableAsync
public class EmailService {

    private JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendMail(String toEmail, String subject, String message) {

        var mailMessage = new SimpleMailMessage();

        mailMessage.setTo(toEmail);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);

        mailMessage.setFrom("johndoe@example.com");

        javaMailSender.send(mailMessage);
    }

    @Async
    public void sendMailWithAttachment(String to, String subject, String body, String fileToAttach)
    {
        MimeMessagePreparator preparator = new MimeMessagePreparator()
        {
            public void prepare(MimeMessage mimeMessage) throws Exception
            {
                mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
                mimeMessage.setFrom(new InternetAddress("admin@gmail.com"));
                mimeMessage.setSubject(subject);
                //mimeMessage.setText(body);

                MimeBodyPart BodyPart = new MimeBodyPart();
                BodyPart.setContent(body,"text/html");

                Multipart multipart = new MimeMultipart();
                multipart.addBodyPart(BodyPart);

                MimeBodyPart attachPart = new MimeBodyPart();
                attachPart.attachFile(fileToAttach);
                multipart.addBodyPart(attachPart);

                mimeMessage.setContent(multipart);

            }
        };

        try {
            javaMailSender.send(preparator);
        }
        catch (MailException ex) {
            // simply log it and go on...
            System.err.println(ex.getMessage());
        }
    }

    @Async
    public void OrderNotification(Long OrderId,DAOUser user, Optional<order> order){

        //emailService.sendMail("mralemamy@gmail.com", "Test Subject", "Test mail");
        String path = "C:\\xampp\\htdocs\\abs\\qrcodes\\QRCode_"+OrderId+".png";

//        String body = "" +
//                "<h1>Thank you for placing your order!</h1>" +
//                "<h3>Your order is ready for pick up at the selected time-slot.</h3>" +
//                "<p>You can use your one-time BR Code to checkout your book. Please be aware of your pickup time period as your BR Code will not work if it was use outside the selected time-slot</p>" +
//                "<br/>" +
//                "<p>Please Stay safe, wear your mask, and keep distance!</p>"
//                + "<";

        String body = "<h2 style=\"text-align: center;\">Thank you for your Order</h2>" +
                "<h4 style=\"text-align: center;\">Hi "+user.getFname().toUpperCase()+" "+user.getLname().toUpperCase()+", Your order for the book "+order.get().getBookName().toUpperCase()+" is ready for pick up at the selected time-slot.</h4>" +
                "<p>You can use your one-time BR Code to checkout your book. Please be aware of your pickup time period as your BR Code will not work if it was use outside the selected time-slot.</p>" +
                "<p>&nbsp;</p>" +
                "<pre><span style=\"color: #ff0000;\">Please Stay safe, wear your mask, and keep distance! <br /><br /><br /><br /><br /></span><em><span style=\"color: #000000;\">Automation Book Solution (ABS) Family<br /></span></em><span style=\"color: #ff0000;\"><br /><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://i.ibb.co/RCYGBbK/ABS-Logo.png\" alt=\"Information Poster\" width=\"382\" height=\"382\" /><br /></span></pre>"+
                "";



        sendMailWithAttachment(user.getEmail(),"New Order Notification", body, path);

    }
}