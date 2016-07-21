/**
 * Copyright 2014-2016, NetEase, Inc. All Rights Reserved.
 * 
 * Date: 2016年1月27日
 */
package com.xwb.demo.utils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.CollectionUtils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

/**
 * json工具类 - fastjson实现
 * 
 * @author roy<hzruanhy@corp.netease.com>
 * @since 2016年1月27日
 */
public final class JsonUtils {

    private static Logger logger = LoggerFactory.getLogger(JsonUtils.class);

    private JsonUtils() {
    }

    /**
     * jakson参数
     */
    private static ObjectMapper mapper = new ObjectMapper();

    /**
     * 将Json的String数据,反序列化成对象
     * 
     * @param jsonString
     * @param clazz
     * @return
     */
    public static <T> T fromJson(String jsonString, Class<T> clazz) {
        boolean isJackson = true;
        T t = null;
        try {
            if (isJackson || (StringUtils.isNotBlank(jsonString) && clazz.isEnum()
                    && clazz.getAnnotation(JsonDeserialize.class) != null)) {
                // CASE1:
                // 如果是枚举类,而且申明了JsonDeserialize,则用jakson反序列化(代码样本见:OrderFormState)
                mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
                t = mapper.readValue(jsonString, clazz);
            } else
                // CASE2: 使用fastjson反序列化
                t = JSON.parseObject(jsonString, clazz);
        } catch (JSONException ex) {
            logger.error("JSONException", ex);
        } catch (IOException ex) {
            logger.error("IOException", ex);
        }
        return t;
    }

    /**
     * 将Json的String数据,反序列化成对象
     * 
     * @param jsonString
     * @return
     */
    public static Object fromJson(String jsonString) {
        Object obj = null;
        try {
            obj = JSON.parse(jsonString);
        } catch (JSONException ex) {
            logger.error("JSONException", ex);
        }
        return obj;
    }

    /**
     * 将Json的String数据,反序列化成对象
     * 
     * @param jsonString
     * @param clazz
     * @return
     */
    public static <T> List<T> parseArray(String jsonString, Class<T> clazz) {
        List<T> list = null;
        try {
            list = JSON.parseArray(jsonString, clazz);
        } catch (JSONException ex) {
            logger.error("JSONException", ex);
        }
        return list;
    }

    /**
     * 将对象,序列化成Json的String数据
     * 
     * @param obj
     * @return
     */
    public static String toJson(Object obj) {
        return toJson(obj, new SerializerFeature[0]);
    }

    /**
     * 将对象,序列化成Json的String数据
     * 
     * @param obj
     * @return
     */
    public static String toJson(Object obj, SerializerFeature... features) {
        boolean isJackson = true;
        String ret = null;
        try {
            if (isJackson || (obj != null && obj.getClass().isEnum()
                    && obj.getClass().getAnnotation(JsonFormat.class) != null))
                // CASE1:
                // 如果是枚举类,而且申明了JsonFormat,则用jakson序列化
                ret = mapper.writeValueAsString(obj);
            else
                // CASE2: 使用fastjson序列化
                ret = JSON.toJSONString(obj, features);
        } catch (JSONException ex) {
            logger.error("JSONException", ex);
        } catch (IOException ex) {
            logger.error("IOException", ex);
        }
        return ret;
    }

    /**
     * @param obj
     * @return
     */
    @SuppressWarnings("deprecation")
    public static String toJsonTabAsSpecial(Object obj) {
        String ret = null;
        try {
            ret = JSON.toJSONString(obj, SerializerFeature.WriteTabAsSpecial);
        } catch (JSONException ex) {
            logger.error("JSONException", ex);
        }
        return ret;
    }

    /**
     * @param text
     * @return
     */
    public static JSONObject toJSONObject(String text) {
        JSONObject jsonObject = null;
        try {
            jsonObject = JSON.parseObject(text);
        } catch (JSONException ex) {
            logger.error("JSONException", ex);
        }
        return jsonObject;
    }
    
    /**
     * 
     * json字符串转map对象
     *
     * @param text
     * @return
     * @author Roy<hzruanhy@corp.netease.com>
     * @since 2016年2月2日
     */
    public static Map<String, Object> toMap(String text) {
        JSONObject jsonObject = toJSONObject(text);
        return toMap(jsonObject);
    }
    
    /**
     * 
     * JsonObject 转map
     *
     * @param jsonObject
     * @return
     * @author Roy<hzruanhy@corp.netease.com>
     * @since 2016年2月2日
     */
    public static Map<String, Object> toMap(JSONObject jsonObject) {
        Map<String, Object> map = new HashMap<>();

        Set<String> keys = jsonObject.keySet();
        if (CollectionUtils.isEmpty(keys)) {
            return null;
        }

        for (String key : keys) {
            Object value = jsonObject.get(key);
            if (value instanceof JSONArray) {
                value = toList((JSONArray) value);
            } else if (value instanceof JSONObject) {
                value = toMap((JSONObject) value);
            }
            map.put(key, value);
        }

        return map;
    }
    
    /**
     * 
     * jsonarray数组转list
     *
     * @param array
     * @return
     * @author Roy<hzruanhy@corp.netease.com>
     * @since 2016年2月2日
     */
    public static List<Object> toList(JSONArray array) {
        List<Object> list = new ArrayList<>();
        for (int i = 0; i < array.size(); i++) {
            Object value = array.get(i);
            if (value instanceof JSONArray) {
                value = toList((JSONArray) value);
            } else if (value instanceof JSONObject) {
                value = toMap((JSONObject) value);
            }
            list.add(value);
        }
        return list;
    }
    
    public static void main(String[] args) {
        String jsonText = "{\"total\": \"zcKQCrrWbv\",\"fieldHeaderList\": [{"
                + "\"fieldId\": 5313,"
                + "\"fieldName\": \"FCIDWAWSEB\","
                + "\"fieldType\": 69231,"
                + "\"selected\": true,"
                + "\"ordered\": 35999,"
                + "\"moduleType\": 86580"
                + "}],"
                + "\"activityLevelHeader\": \"rfIfHljtmc\","
                + "\"goodsChioceHeader\": \"QSkAkCGbGZ\","
                + "\"code\": 200,"
                + "\"pageInfo\": {"
                + "\"total\": 74236,"
                + "\"pageSize\": \"OmJABqsBxj\","
                + "\"currentPage\": \"tDiLdYOLRg\"},"
                + "\"msg\": \"wAjzDduCgu\"}";
        Map<String, Object> map = toMap(jsonText);
        if (!CollectionUtils.isEmpty(map)) {
            for (Entry<String, Object> entry : map.entrySet()) {
                System.out.println(entry.getKey() + ":" + entry.getValue());
            }
        }
    }
}
