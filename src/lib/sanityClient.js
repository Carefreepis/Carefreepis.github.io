import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'ni6s4ci9',
  dataset: 'production',
  apiVersion: 'v1',
  token:
    'sk6z9CwNhUUxuuBsleTLPgroAUL9RbStKFH1XER6uExMiUACZECavxtWW6PdMIA3hQPqS86WDzSeWwlBmf8qpN8wSfeAX9v7BzxZCrZi037A0mmgjHb1hkk9DXqNphhS2cUxYbMPtrZyYkgkbC7BISOaHoe0jGpsuU0R4ktnlIAES3XNfmYn',
  useCdn: false,
})
