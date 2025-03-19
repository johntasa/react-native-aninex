import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../redux/animeSlice";
import { IconButton, MD3Colors } from 'react-native-paper';

export default function FavButton ({ animeInfo }) {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.anime.favorites);

  const isFavorite = favorites.some((fav) => fav.id === animeInfo.id);

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(animeInfo.id));
    } else {
      dispatch(
        addToFavorites(animeInfo)
      );
    }
  };

  return (
    <IconButton
      icon={isFavorite ? "heart" : "heart-outline"}
      color={isFavorite? MD3Colors.red800 : MD3Colors.grey500}
      size={20}
      onPress={toggleFavorites}
    />
  )
}