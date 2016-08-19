package cn.rcw.test.comm;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Random;

import sun.misc.BASE64Encoder;

/**
 * @author zhuyg
 * @date 2015-6-8
 * @version 1.0
 */
public class CommUtil {

	/**
	 * 是否为空
	 * 
	 * @param obj
	 * @return
	 */
	public static boolean isEmpty(Object obj) {
		if (obj == null)
			return true;
		// 字符串
		if (obj instanceof String) {
			String str = (String) obj;
			if (str == null || str.equals("")
					|| str.equalsIgnoreCase("undefined"))
				return true;
			return false;
		}
		// int
		if (obj instanceof Integer) {
			// Integer i=(Integer)obj;
			// if(i==null)return true;
			return false;
		}
		// List
		if (obj instanceof List<?>) {
			List<?> l = (List<?>) obj;
			if (l == null || l.size() == 0)
				return true;
			return false;
		}

		// 未知类型
		return false;

	}

	/**
	 * 是否为非空
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isNotEmpty(Object obj) {
		return (!isEmpty(obj));
	}
	
	public static List<String> asList(String values){
		String[] arr = values.split(",");
		List<String> list = Arrays.asList(arr);
		return list;
	}
	
	/**
	 * 检查对象中是否含有非空值的属性
	 * @param obj			对象
	 * @param exclude	需要排除的属性
	 * @return
	 */
	public static boolean containsNonNullValues(Object obj, String...exclude) {
		try {
			// 得到类对象
			Class<?> c = (Class<?>) obj.getClass();
			//得到类中的所有属性集合
			Field[] fs = c.getDeclaredFields();
			for (Field f : fs) {
				// 设置些属性是可以访问的
				f.setAccessible(true); 
				// 得到此属性的值
				Object val = f.get(obj);
				//是否有需要排除某些属性值，如果有，则判断当前属性是否在其中
				boolean state = false;
				if(exclude.length>0) state= exclude[0].contains(f.getName());
				if (!state && val != null && !"".equals(val))
					return true;
			}
			//父类
			Class<?> superClass = c.getSuperclass();
			fs = superClass.getDeclaredFields();
			for (Field f : fs) {
				// 设置些属性是可以访问的
				f.setAccessible(true); 
				// 得到此属性的值
				Object val = f.get(obj);
				//是否有需要排除某些属性值，如果有，则判断当前属性是否在其中
				boolean state = false;
				if(exclude.length>0) state= exclude[0].contains(f.getName());
				if (!state && val != null && !"".equals(val))
					return true;
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return false;
	}
	
	/**
	 * 检查对象中是否含有空值的属性
	 * @param obj			对象
	 * @param exclude	需要排除的属性
	 * @return
	 */
	public static boolean containsNullValues(Object obj, String...exclude) {
		try {
			// 得到类对象
			Class<?> c = (Class<?>) obj.getClass();
			//得到类中的所有属性集合
			Field[] fs = c.getDeclaredFields();
			for (Field f : fs) {
				// 设置些属性是可以访问的
				f.setAccessible(true); 
				// 得到此属性的值
				Object val = f.get(obj);
				//是否有需要排除某些属性值，如果有，则判断当前属性是否在其中
				boolean state = false;
				if(exclude.length>0) state= exclude[0].contains(f.getName());
				if(!state && (val==null || "".equals(val))) return true;
					return true;
			}
			//父类
			Class<?> superClass = c.getSuperclass();
			fs = superClass.getDeclaredFields();
			for (Field f : fs) {
				// 设置些属性是可以访问的
				f.setAccessible(true); 
				// 得到此属性的值
				Object val = f.get(obj);
				//是否有需要排除某些属性值，如果有，则判断当前属性是否在其中
				boolean state = false;
				if(exclude.length>0) state= exclude[0].contains(f.getName());
				if(!state && (val==null || "".equals(val))) return true;
					return true;
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return false;
	}
	
	/**
	 * 生成随机数
	 * @param length	随机数长度
	 * @return
	 */
	public static String randomString(int length){
		Random random = new Random();
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < length; ++i){
			int number = random.nextInt(3);
			long result = 0;
			switch (number){
				case 0:
					result = Math.round(Math.random() * 25 + 65);
					sb.append(String.valueOf((char)result));
					break;
				case 1:
					result = Math.round(Math.random() * 25 + 97);
					sb.append(String.valueOf((char)result));
					break;
				case 2:
					sb.append(String.valueOf(new Random().nextInt(10)));
					break;
			}
		}
		return sb.toString();
	}
	
	
	/**
	 * slj
	 * @param field
	 * @param value
	 * @return
	 */
	public static String getIsDistrict(String field, String value) {
		String json = field + ":(";
		String values[] = value.split(";");
		for (int i = 0; i < values.length; i++) {
			if (values[i].length() > 0) {
				String fieldvalue = values[i].replace(",", "#");

				if (i == values.length - 1) {
					json = json + "*#" + fieldvalue + "*";
				} else {
					json = json + "*#" + fieldvalue + "*  OR ";
				}
			}
		}
		json = json + ") ";
		return json;
	}
	
	/**
	 * slj
	 * @param field
	 * @param value
	 * @param quan
	 * @return
	 */
	public static String getDistrict(String field, String value,
			String quan) {
		String json = field + ":(";
		String values[] = value.split(";");
		for (int i = 0; i < values.length; i++) {
			String city[] = values[i].split(",");
			String fieldvalue = values[i].replace(",", "#");
			if(city.length<2){
				if (i == values.length - 1) {
					json = json + "*#" + fieldvalue + "*";
				}else{
					json = json + "*#" + fieldvalue + "* OR ";
				}
			}else{
				if (i == values.length - 1) {
					json = json + "*#" + fieldvalue + "* OR  #"+city[0] + "#0" +quan+" ";
				}else{
					json = json + "*#" + fieldvalue + "* OR  #"+city[0] + "#0" +quan+" OR ";
				}
			}
		}
		json = json + ") ";
		return json;
	}
	
	/**
	 * slj
	 * @param field
	 * @param value
	 * @return
	 */
	public static String getJson(String field, String value) {
		String json = field + ":(";
		String values[] = value.split(";");
		for (int i = 0; i < values.length; i++) {
			String fieldvalue = values[i].replace(",", "#");
			if (i == values.length - 1)
				json = json  + "*#" + fieldvalue + "*";
			else
				json = json  + "*#" + fieldvalue + "*" + " OR ";
		}
		json = json + ") ";
		return json;
	}
	
	/**
	 * 获取N年前的今天-时间戳
	 * @param year
	 * @return
	 * @author slj
	 */
	public static Integer getTime(Integer year) {  
		Integer re_time = null;
		Calendar cd = Calendar.getInstance();
    	cd.add(Calendar.YEAR, -year);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date dat = cd.getTime();
		String user_time = sdf.format(dat);
		Date d;  
		try {  
			d = sdf.parse(user_time);
			String str = String.valueOf( d.getTime()/1000L);  
			re_time = Integer.parseInt(str); 
		} catch (Exception e) {  
			// TODO Auto-generated catch block  
			e.printStackTrace();  
		}  
		return re_time;  
	} 
	
	/**
	 * TODO : 根据url获取图片并进行base64编码
	 * @author shenjl
	 * @date 2016-1-6
	 * @param urlPath
	 * @return
	 */
	@SuppressWarnings("restriction")
	public static String getUrlPhoto(String urlPath) {
			URL url = null;  
        try {  
            url = new URL(urlPath);  
            InputStream is = url.openStream();
                byte[] buffer = new byte[is.available()];  
                is.read(buffer);
                BASE64Encoder encoder = new BASE64Encoder();
        		return encoder.encode(buffer);
            } catch (MalformedURLException e) {  
                e.printStackTrace();  
                return "";
            } catch (IOException e) {  
                e.printStackTrace();  
                return "";
            }
	}
}
