#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Created on Tue Jun  6 11:41:41 2017

@author: sajjan
"""
from __future__ import print_function
from builtins import input
from builtins import str
import serial
import datetime as dt
import numpy as np
import threading


def create_log_file(id_num=""):
    date = dt.datetime.now()
    year = str(date.year)
    month = str(date.month)
    day = str(date.day)
    file_name = ("./vaisala" + str(id_num) + "_data" +
                 year + month + day + ".txt"
                 )
    file = open(file_name, mode="w")
    file.write("Time, wdmin(D), wdavg(D), wdmax(D), wsmin(ms-1), " +
               "wsavg(ms-1), " +
               "wsmax(ms-1), temp(C), humid(%), press(hPa), rainaccum(mm), " +
               "raindur(s), rainintensity(mm/h), hailaccum(hits/cm2), " +
               "haildur(s), hailintensity(hits/cm2/h), " +
               "rainpkintensity(mm/h), " +
               "hailpkintensiy(hits/cm2), pt100, aux_rain(mm), " +
               "level(V*gain), " +
               "solar_rad(V*gain), heating_temp(C), heating_volt(V)," +
               "supply_volt(V), ref_volt(V)" + "\n"
               )
    file.close()
    return file_name


def interprate_vaisala_string(ser, log_file):
    data_dict = {"R1": slice(1, 7), "R2": slice(7, 10), "R3": slice(10, 18),
                 "R4": slice(18, 22), "R5": slice(22, None)
                 }
    data_lst = [np.nan] * 25
    while True:
        sentence = ser.readline()[:-2].split(",")
        measurement_time = dt.datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")
        key = sentence[0][1:]
        if key != (""):
            data = [var[3:-1] for var in sentence[1:]]
            data_lst[0] = measurement_time
            data_lst[data_dict[key]] = data
            data_dict[key].append(data)
        print(data_lst)
        file = open(log_file, mode="a")
        file.write(str(data_lst))
        file.close()


def begin_logging(loc1="", loc2=""):
    if loc1 != "":
        ser1 = serial.Serial(loc1, baudrate=19200, timeout=1)
        file1 = create_log_file(id_num=1)
        t1 = threading.Thread(target=interprate_vaisala_string(ser1, file1))
        t1.setDaemon(True)
        t1.start()
    else:
        print("No Vaisala connected")
        return

    if loc2 != "":
        ser2 = serial.Serial(loc2, baudrate=19200, timeout=1)
        file2 = create_log_file(id_num=2)
        t2 = threading.Thread(target=interprate_vaisala_string(ser2, file2))
        t2.setDaemon(True)
        t2.start()
    else:
        print("Only 1 Vaisala connected, log for only 1 isntrument")
        pass
loc1 = input("Enter location of Vaisala")
print(loc1)
if loc1 != "":
    loc2 = input("Is there second Vaisala? If so enter its location, else" +
                 " hit enter")
    print(loc2)
# "/dev/ttyUSB0", "/dev/ttyUSB2"
begin_logging(loc1, loc2)
