`timescale  1ns / 1ps
`include "ALU.v"
module tb_ALU;

// ALU Parameters
parameter PERIOD  = 10;


// ALU Inputs
reg   [3:0]  A                             = 0 ;
reg   [3:0]  B                             = 0 ;
reg   [2:0]  operation                     = 0 ;

// ALU Outputs
wire  [3:0]  result                        ;
wire  cout                                 ;



ALU  u_ALU (
    .A                       ( A          [3:0] ),
    .B                       ( B          [3:0] ),
    .operation               ( operation  [2:0] ),

    .result                  ( result     [3:0] ),
    .cout                    ( cout             )
);

initial
begin
    $dumpfile("ALUtb.vcd");
    $dumpvars;
    A=4'b1011;B=4'b1000;
    #1 operation=3'b000;
    #1 operation=3'b001;
    #1 operation=3'b010;
    #1 operation=3'b011;
    #1 operation=3'b100;
    #1 operation=3'b101;
    #1 operation=3'b110;
    #1 operation=3'b111;
    #1 operation=3'b000;
    $finish;
end

endmodule