
#include <stdio.h>
#include "common.c"
#include "main.h"
#include "vendor/app.h"

typedef unsigned char u8;

extern int sum(int a, int b);
__uint8_t crc8(__uint16_t datatype, __uint8_t length, unsigned char *data)
{
  __uint8_t crc8;
  crc8 = (datatype >> 0) & 0xFF;
  crc8 ^= (datatype >> 8) & 0xFF;
  crc8 ^= (length >> 0) & 0xFF;
  crc8 ^= (length >> 8) & 0xFF;

  __uint8_t i = 0;
  for (i = 0; i < length; i++)
  {
    crc8 ^= data[i];
  }

  return crc8;
}


extern int glen;

void as()
{
  glen = 3;
}

int main()
{
  as();
  int a = sum(3, 6);
  printf("%s", a);
  return 0;
}
