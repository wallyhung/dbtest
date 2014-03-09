package com.wally.reader;

public class FileEntity 
{
  //private String name;
	private String url;
	private String cover; //封面
	private String size;
	private String date;
	
	public FileEntity() {
	}

	/*public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
*/
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getCover() {
		return cover;
	}

	public void setCover(String cover) {
		this.cover = cover;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

}
