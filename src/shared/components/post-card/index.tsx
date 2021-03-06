import React from 'react'
import { Box, Avatar, HStack, Text, Link } from '@chakra-ui/react'
import NexLink from 'next/link'

type PostPReviewType = {
	title: string
	name: string
	id: string
	truncatedBody: string
}

export default function PostPreview({
	title,
	name,
	id,
	truncatedBody,
}: PostPReviewType) {
	return (
		<Box
			h='100%'
			w='100%'
			border='1px'
			borderColor='CadetBlueCrayola'
			boxShadow='md'
			borderRadius='8px'
			paddingLeft='24px'
			paddingRight='24px'
			paddingTop='12px'
			paddingBottom='12px'
			marginTop='24px'
			bg='white'
		>
			<HStack spacing='12px'>
				<Avatar size='sm' />
				<Text fontSize='lg'>{name}</Text>
			</HStack>
			<Text fontSize='xl'>
				<NexLink href='/post/[id]' as={`/post/${id}`}>
					<Link>{title}</Link>
				</NexLink>
			</Text>
			<Text fontSize='large'>{truncatedBody}</Text>
		</Box>
	)
}
