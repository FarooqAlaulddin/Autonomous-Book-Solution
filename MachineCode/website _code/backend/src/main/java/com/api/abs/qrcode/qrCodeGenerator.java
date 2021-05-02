package com.api.abs.qrcode;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import javax.imageio.ImageIO;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.io.File;
import java.awt.image.BufferedImage;
import org.apache.commons.codec.binary.Base64;

public class qrCodeGenerator {
    public byte[]  getQRCodeImage(String text, Long orderId) throws WriterException, IOException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        text = ""+orderId;
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, 350, 350);
        Path path = FileSystems.getDefault().getPath("C:\\xampp\\htdocs\\abs\\qrcodes\\QRCode_"+orderId+".png");
        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
        String imagePath = "C:\\xampp\\htdocs\\abs\\qrcodes\\QRCode_"+orderId+".png";
        BufferedImage image = ImageIO.read(new File(imagePath));
        ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
        ImageIO.write(image , "png", pngOutputStream);
    //    MatrixToImageWriter.writeToStream(bitMatrix, "PNG", pngOutputStream);
        byte[] pngData = pngOutputStream.toByteArray();
        byte[] base64Image = Base64.encodeBase64(pngData);

        return base64Image;
    }
}
