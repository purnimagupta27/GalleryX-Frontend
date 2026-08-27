import { useEffect } from "react"
import { getCollections } from "../services/collection.service"

export const BookmarkPage = () => {
    useEffect(() => {
        const fetchSaves = async() => {
            const response = await getCollections()
            console.log(response.data)
        }
        fetchSaves()
    }, [])

  return (
    <div>
        <h1>Bookmarks</h1>
    </div>
  )
}
