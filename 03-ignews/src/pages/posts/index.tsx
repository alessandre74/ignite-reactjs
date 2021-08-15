import { GetStaticProps } from 'next'
import Head from 'next/head'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import { getPrismicClient } from 'services/prismic'
import styles from './styles.module.scss'
import Link from 'next/link'

import { FormatDate } from '../../helper/index'

type Post = {
  slug: string
  title: string
  excerpt: string
  updatedAt: string
}

interface PostsProps {
  posts: [Post]
}
export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.conatiner}>
        <div className={styles.posts_}>
          {posts.map((post, index) => (
            <Link key={index} href={`/posts/${post.slug}`}>
              <a key={post.slug}>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const primisc = getPrismicClient()

  const response = await primisc.query([Prismic.predicates.at('document.type', 'publication')], {
    fetch: ['publication.title', 'publication.content'],
    pageSize: 100
  })

  // Quando o responde vem com data e dentro [object]
  // console.log(JSON.stringify(response, null, 2))

  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find((content) => content.type === 'paragraph')?.text ?? '',
      updatedAt: FormatDate(post.last_publication_date)
    }
  })

  return {
    props: { posts }
  }
}
