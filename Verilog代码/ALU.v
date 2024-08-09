module ALU(  
    input [3:0] A,       // 4位操作数A  
    input [3:0] B,       // 4位操作数B  
    input [2:0] operation,// 3位控制信号  
    output reg [3:0] result, // 4位结果，使用reg是因为在always块中赋值  
    output reg cout       // 1位进位，使用reg是因为在always块中赋值  
);  
  
  // 使用always @(*) 块描述组合逻辑  
  always @(*) begin  
    // 初始化变量（如果需要）  
    cout = 0; // 默认没有进位  
    case(operation)  
      // A + B  
      3'b000: begin  
        {cout, result} = A + B; // 使用花括号来接收加法操作的进位和结果  
      end  
      // A - B  
      3'b001: begin  
        {cout, result} = A - B + 4'b0001; // 注意这里为了处理负数的借位，加了4'b0001（即-1的补码）  
        if (A < B) begin // 如果A小于B，则需要调整进位和结果（根据是否有借位）  
          cout = 0;  
          result = 4'b1111 - (B - A); // 假设我们处理无符号数，这里只是简单示例  
        end  
      end  
      // ... 此处需要继续实现剩余的6种运算  
      // B + 1  
      3'b010: begin  
        result = B + 1'b1;  
        cout = (B == 4'b1111); // 只在B为4位全1时进位  
      end  
      // B - 1  
      3'b011: begin  
        result = B - 1'b1;  
        cout = 0; // 对于无符号数，B-1不会产生进位  
      end  
      // NOT A  
      3'b100: begin  
        result = ~A;  
        cout = 0; // NOT操作不产生进位  
      end  
      // A XOR B  
      3'b101: begin  
        result = A ^ B;  
        cout = 0; // XOR操作不产生进位  
      end  
      // A AND B  
      3'b110: begin  
        result = A & B;  
        cout = (result == 4'b1111); // 只有在结果全为1时才产生进位（这里的进位定义可能不符合常规逻辑，仅作示例）  
      end  
      // A OR B  
      3'b111: begin  
        result = A | B;  
        cout = 0; // OR操作不产生进位  
      end  
      default: begin  
        result = 4'bXXXX; // 使用X表示未定义的操作结果  
        cout = 0;  
      end  
    endcase  
  end  
endmodule