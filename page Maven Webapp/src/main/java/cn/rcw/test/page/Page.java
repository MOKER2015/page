package cn.rcw.test.page;

import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.JSONArray;

/** 
 * Description: 分页 
 * Author: liuzh 
 * Update: liuzh(2014-04-16 10:56) 
 */  
public  class Page<E> {  
    private int page;  
    private int rows;  
    private int startRow;  
    private int endRow;  
    private long total;  
    private int pages;  
    private List<E> result= new ArrayList<E>(); 
    
    public Page() {}

    public Page(int page, int rows) {  
        this.page = page;  
        this.rows = rows;  
        this.startRow = page > 0 ? (page - 1) * rows : 0;  
        this.endRow = page * rows;  
    }  

    public List<E> getResult() {  
        return result;  
    }  

    public void setResult(List<E> result) {  
        this.result = result;  
    }  

    public int getPages() {  
        return pages;  
    }  

    public void setPages(int pages) {  
        this.pages = pages;  
    }  

    public int getEndRow() {  
        return endRow;  
    }  

    public void setEndRow(int endRow) {  
        this.endRow = endRow;  
    }  

    public int getPage() {  
        return page;  
    }  

    public void setPage(int page) {  
        this.page = page;  
    }  

    public int getRows() {  
        return rows;  
    }  

    public void setRows(int rows) {  
        this.rows = rows;  
    }  

    public int getStartRow() {  
        return startRow;  
    }  

    public void setStartRow(int startRow) {  
        this.startRow = startRow;  
    }  

    public long getTotal() {  
        return total;  
    }  

    public void setTotal(long total) {  
        this.total = total;  
    }  

    @Override  
	public String toString(){
		return "{\"total\":" + total +",\"pages\":"+pages+",\"page\":"+page+",\"rows\":" + JSONArray.toJSONString(result) + "}";
	}
}  