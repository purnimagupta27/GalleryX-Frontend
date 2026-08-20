import { useEffect } from "react"
import { getUserProfile } from "../services/user.service"
import { useParams } from "react-router-dom"

const UserProfilePage = () => {
    const {userId} = useParams()
    console.log(userId)

    useEffect(() => {
        const fetchUserProfile = async() => {
            const response = await getUserProfile(userId)
            console.log(response.data)
        }
        fetchUserProfile()
    })

  return (
    <div>
        User...
    </div>
  )
}

export default UserProfilePage