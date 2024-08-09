module vote_7in(
input a,b,c,d,e,f,g,
output out
    );
assign out = (a+b+c+d+e+f+g >3)?1:0;
endmodule

