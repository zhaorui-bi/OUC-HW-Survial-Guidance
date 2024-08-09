module counter(  
    input clk,  
    input reset,  
    input enable,  
    output reg [3:0] count  
);  
  
    // 如果reset为0，count设置为0；  
    // 如果enable为1，在时钟上升沿，count加1；  
    // 如果enable为0，count不变  
  
    always @(posedge clk or negedge reset)
    begin
        if(reset) 
            begin  
                if(enable)
                    count<=count+1'b1;
            end
            else
                count<=0;
    end  
  
endmodule