`timescale 1ns / 1ns
`include "7_vote(.v"
module vote_7in_tb;
reg a,b,c,d,e,f,g;
wire out;

vote_7in U1(.a(a),.b(b),.c(c),.d(d),.e(e),.f(f),.g(g),.out(out));

initial 
begin
	$dumpfile("7wave.vcd");
	$dumpvars;
	{a,b,c,d,e,f,g} = 7'b0;
	#5 a = 1'b1;
	#5 b = 1'b1;
	#5 c = 1'b1;
	#5 d = 1'b1;
	#5 e = 1'b1;
	#5 f = 1'b1;
	#5 g = 1'b1;
	#5 $stop;
	$finish;
end
endmodule



