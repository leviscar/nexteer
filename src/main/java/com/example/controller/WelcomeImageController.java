package com.example.controller;

import com.example.model.WelcomeImage;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.web.bind.annotation.*;
import sun.misc.BASE64Decoder;

import java.io.*;


/**
 * User: cheng
 * Date: 17-6-7
 * Description:
 */
@RestController
@RequestMapping(value = "/welcome")
public class WelcomeImageController {
    private final String userDir = WelcomeImageController.class.getClassLoader()
            .getResource("/").getPath() + "static/images/welcome/";

    @RequestMapping(method = RequestMethod.POST)
    public int add(@RequestBody WelcomeImage image) {
        try {
            File newImage = new File(userDir + image.getName());
            BASE64Decoder decoder = new BASE64Decoder();
            newImage.getParentFile().mkdirs();
            newImage.createNewFile();
            byte[] bytes = decoder.decodeBuffer(image.getImage());
            ByteArrayInputStream iStream = new ByteArrayInputStream(bytes);
            FileOutputStream out = new FileOutputStream(newImage);
            byte[] b = new byte[1024];
            int len = 0;
            while ((len = iStream.read(b)) != -1) {
                out.write(b, 0, len);
                out.flush();
            }
            out.close();
            iStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return 1;
    }

    @RequestMapping(method = RequestMethod.GET)
    public String getByName(@RequestParam(value = "name") String name) {
        String imagePath = userDir + name;
        byte[] data = new byte[1024];
        try {
            InputStream in = new FileInputStream(imagePath);
            data = new byte[in.available()];
            in.read(data);
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new String(Base64.encodeBase64(data));
    }
}
