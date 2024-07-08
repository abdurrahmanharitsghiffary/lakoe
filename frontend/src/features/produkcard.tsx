import { Card, CardBody, CardFooter, Text, Image, Stack,Button, Flex, Checkbox, Spacer, Switch } from '@chakra-ui/react'

function produkcard(){
    return(
        <Card
  direction={{ base: 'column',sm: 'row' }}
  overflow='hidden'
  variant='outline'

>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
    alt='Caffe Latte'
  />

  <Stack>
    <CardBody width='1170px'>
        <Flex>
            <Text size='md' fontWeight='semibold'>Kaos Cotton  </Text>
            <Spacer/>
            <Checkbox size='lg' colorScheme='blue'>
            </Checkbox>
        </Flex>
                <Stack direction='row' spacing={1} mt='-5px'>
                    <Text py = '2'fontSize='sm' fontWeight='semibold'>
                        Rp.66.000 
                    </Text>
                    <Text py = '2'fontSize='sm' color={'gray'}>
                        •  Stok 20 • SKU 056884477 
                    </Text>
                </Stack>
    </CardBody>

    <CardFooter mt={'-50px'}>
        <Flex  width='1130px'>
            <Stack spacing={2} direction='row' align='center' >
                <Button variant='outline' colorScheme='black' borderRadius='20px' fontSize={'small'} size={'sm'} >
                    Ubah Harga
                </Button>
                <Button variant='outline' colorScheme='black' borderRadius='20px' fontSize={'small'} size={'sm'} >
                    Ubah Stock
                </Button> 
                <Button variant='outline' colorScheme='black' borderRadius='20px' fontSize={'small'} size={'sm'}> 
                    Lihat Halaman
                </Button>
                <Button variant='outline' colorScheme='black' borderRadius='20px' fontSize={'small'} size={'sm'}>
                ...
                </Button>
            </Stack>
                <Spacer/>
                    <Switch size='lg' marginTop='60px'/>
        </Flex>
    </CardFooter>
  </Stack>
</Card>
    )
}

export default produkcard
