import time



file_name = "Data_Record_2017526.txt"
i = 0

#data = file.readlines()[-4:-1]
#length = len(file.readlines())
file  = open(file_name, mode="r")
x = file.readlines()



while True :
    y = x[i] + ', ' + str(i)
    print(y)
    data_source = open("./datasource.txt", 'w')
    data_source.write(y)
    data_source.close()
    i = i + 1
    time.sleep(0.1)
