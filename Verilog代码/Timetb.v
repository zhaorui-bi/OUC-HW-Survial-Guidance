`timescale  1ns / 1ps
`include "Time.v"
module tb_counter;

// counter Parameters
parameter PERIOD  = 10;


// counter Inputs

reg   reset                                = 0 ;
reg   enable                               = 1 ;

// counter Outputs
wire  [3:0]  count                         ;




counter  u_counter (
  
    .reset                   ( reset         ),
    .enable                  ( enable        ),

    .count                   ( count   [3:0] )
);

initial
begin
    $dumpfile("twave.vcd");
   $dumpvars;
    #2 reset =0;
    #5 reset=1;
    #40 enable=0;
    #41 enable=1;
    #50 reset=0;
    #51 reset=1;
    #6000 $stop;
    $finish;
end
    reg clk;
    initial
        clk=0;
        always #(clk)
        clk=~clk;
        counter ctr(clk,reset,enable,count);
endmodule