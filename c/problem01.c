#include <stdio.h>

int add(int i, int j) {
    return i + j;
}

int sub(int i, int j) {
    return i - j;
}

void main() {
    int (*pf)(int, int);

    // a에 들어갈 코드
    pf = add;
    printf("%d\n", pf(5, 4));  // add(5, 4) = 9

    // b에 들어갈 코드
    pf = sub;
    printf("%d\n", pf(5, 4));  // sub(5, 4) = 1
}

/* 
 * c언어 컴파일 cmmand
 gcc filename.c -o outputname

 * c언어 실행 command
 ./[파일이름]
*/