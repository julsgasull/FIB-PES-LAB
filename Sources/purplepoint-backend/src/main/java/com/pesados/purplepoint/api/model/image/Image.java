package com.pesados.purplepoint.api.model.image;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.Date;

import javax.imageio.ImageIO;
import javax.persistence.*;

import net.bytebuddy.utility.RandomString;

@Entity
@Table(name = "Users")
public class Image {
	public Image() {
		super();
	}
	public Image(String name, String type, byte[] picByte) {
		this.name = name;
		this.type = type;
		this.picByte = picByte;
	}	
	
	public Image(String myUrl) throws IOException {
		// TODO Auto-generated constructor stub
        URL imageUrl = new URL(myUrl);  

        // Get image from url
        
        BufferedImage image = ImageIO.read(imageUrl);

        // Get Byte Array
        
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
 
        // Write image as jpg into byteArray
        
        ImageIO.write(image,"jpg",byteArrayOutputStream);

        // Flush image created to byteArrayOutoputStream

        byteArrayOutputStream.flush();

        // Create Random file name but unique by adding timestamp with extension

        this.name = RandomString.make() + new Date().getTime() + ".jpg";
        this.picByte = byteArrayOutputStream.toByteArray();
        this.type = "image/jpg";

        byteArrayOutputStream.close(); // Close once it is done saving
	}
	
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;	
	@Column(name = "name")
	private String name;	
	@Column(name = "type")
	private String type;
	@Column(name = "picByte", length = 1000)
	private byte[] picByte;
}
