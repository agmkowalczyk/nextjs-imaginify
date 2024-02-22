import { UserButton } from '@clerk/nextjs'

const Home = () => {
  return (
    <div>
      <p>
        <UserButton afterSignOutUrl='/' />
      </p>
    </div>
  )
}

export default Home
