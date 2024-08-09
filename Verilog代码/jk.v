module jk_ff(j,k,q,clk,rst);
input j,k,clk,rst;
output reg q;
always@(posedge clk or posedge rst)
begin
	if(rst == 1'b1)
		q = 0;
	else
		case({j,k})
		2'b00:q = q;
		2'b10:q = 1;
		2'b01:q = 0;
		2'b11:q = ~q;
		endcase
end
endmodule

