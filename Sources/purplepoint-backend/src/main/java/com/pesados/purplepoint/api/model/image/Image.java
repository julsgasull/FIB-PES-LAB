package com.pesados.purplepoint.api.model.image;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.Date;

import javax.imageio.ImageIO;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import io.swagger.v3.oas.annotations.media.Schema;
import net.bytebuddy.utility.RandomString;

@Entity
@Table(name = "Images")
public class Image {
	
	public static String defaultUrl = "https://image.flaticon.com/icons/svg/1738/1738691.svg";
	
	@Schema(description = "Id of the image.", required = true)
	@Id
	@Column(name = "imageid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long imageid;	
	@Schema(description = "Unique name of the image.", required = true)
	@Column(name = "imgname")
	private String name;	
	@Schema(description = "Type of the image.", required = false)
    @Column(name = "type")
	private String type;
	
	@Schema(description = "Image bytes.", required = true)
	@Column(name = "picByte")
	@Lob
	private byte[] picByte;
	
	public Image() {
		super();
	}
	
	public Image(String name, String type, byte[] picByte) {
		this.name = name;
		this.type = type;
		this.picByte = picByte;
	}	
	
	public Image(String myUrl) throws IOException {
        URL imageUrl = new URL(myUrl);  

        // Get image from url
        
        BufferedImage image = ImageIO.read(imageUrl);

        // Get Byte Array
        
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
 
        // Write image as jpg into byteArray
        
        ImageIO.write(image,"svg",byteArrayOutputStream);

        // Flush image created to byteArrayOutoputStream

        byteArrayOutputStream.flush();

        // Create Random file name but unique by adding timestamp with extension

        this.name = RandomString.make() + new Date().getTime() + ".svg";
        this.picByte = byteArrayOutputStream.toByteArray();
        this.type = "image/svg";

        byteArrayOutputStream.close(); // Close once it is done saving
	}
	
	public void setImageid (Long id) {
		this.imageid = id;
	}
	
	public Long getImageid() {
		return this.imageid;
	}
	
	public void setName (String name) {
		this.name = name;
	}
	
	public String getName () {
		return this.name;
	}
	
	public void setType(String type) {
		this.type = type;
	}
	
	public String getType() {
		return this.type;
	}
	
	public void setPicByte(byte[] data) {
		this.picByte = data;
	}
	
	public byte[] getPicByte() {
		return this.picByte;
	}
}
