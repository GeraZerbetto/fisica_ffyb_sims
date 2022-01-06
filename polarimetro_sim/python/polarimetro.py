import cv2
import numpy as np
import math

def nothing(x):
    pass

windowName="Polarimetro"
cv2.namedWindow(windowName)
cv2.createTrackbar("Analizador", windowName, 0, 3600, nothing)
cv2.createTrackbar("Polarizador", windowName, 0, 3600, nothing)


showLive = True
while showLive:
    analiz_deg = cv2.getTrackbarPos("Analizador", windowName)/10
    pola_deg = cv2.getTrackbarPos("Polarizador", windowName)/10
    retard_deg = -pola_deg

    deg_net_angle = pola_deg - analiz_deg
    deg_retard_angle = retard_deg - analiz_deg
    
    rad_angle = math.radians(deg_net_angle)
    retard_rad = math.radians(deg_retard_angle)
    
    h, w = 500,500
    img = np.zeros((h,w,3), np.uint8)
    cv2.circle(img,(250,250), 200, (255,255,255), -1)
    img[:,:249] = img[:,:249] * (math.cos(rad_angle)**2)
    img[:,250:] = img[:,250:] * (math.cos(retard_rad)**2)
   # img = img * 1
    cv2.imshow(windowName, img[:,:])
    if cv2.waitKey(1) == 27:
        showLive = False
