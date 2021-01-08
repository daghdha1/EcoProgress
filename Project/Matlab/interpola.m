    
function exitcode = interpola(listx,listy,listz,result,n)
disp(listx)
disp(listy)
disp(listz)

[x]=importdata(listx);

[y]=importdata(listy);

[z]=importdata(listz);

%{
latGRID=38.9981236:0.00018:39.0170591;
lonGRID=-0.1767568992:0.00023:-0.1454121450;

[LATGRID,LONGRID]=meshgrid(latGRID,lonGRID)d
%}
% Punto inicial 39.020594, -0.211071
% Punto final 38.944588, -0.129491

% Dividimos la lat/lon inicial hasta la lat/lon final de 20*n en 20*n
% metros.
y1 = 38.944588:(0.00018*n):39.020594; 
x1= -0.211071:(0.00023*n):-0.129491;

[X1,Y1] = meshgrid(x1,y1);

% Guardamos la matriz
writematrix(X1,"required/fixedx.txt",'Delimiter',',') 
writematrix(Y1,"required/fixedy.txt",'Delimiter',',') 

Z_corrector= griddata(x,y,z,X1,Y1,'v4');
Z_corrector = max(0,min(100,Z_corrector));

% pcolor(X1,Y1,Z_corrector), shading interp, colorbar
% plot(Z_corrector)
% title('Ejercicio 2 tarea')

% figure, [C,h]=contour(X1,Y1,LDEN_corrector, 30); clabel(C,h),colorbar
% title('Curvas de nivel tarea 2')
writematrix(Z_corrector,result,'Delimiter',',')  

%fclose(c);
quit
end