package com.xwb.demo.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggerUtils {

	public static final Logger ACCESS_LOG = LoggerFactory.getLogger("accessLogger");

	public static final Logger RUN_LOG = LoggerFactory.getLogger("runLogger");

	public static final Logger ERROR_LOG = LoggerFactory.getLogger("errorLogger");
}
