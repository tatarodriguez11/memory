export const getCards = async () =>{
  try {
    const response = await fetch(`https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20`)
    const json = await response.json()
    const cards = json.entries

    const showCards = cards?.map((card, index) => ({
      id: card?.fields?.image?.uuid+index,
      url: card?.fields?.image?.url,
      title: card?.fields?.image?.title
    }))
    return showCards
  } catch (error) {
    throw new Error('Error looking for cards')
  }
}