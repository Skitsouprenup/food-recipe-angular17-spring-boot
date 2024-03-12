export interface userInfoType {
  email: string,
  fullName: string,
  id: string,
  profileImage: string
};

export interface recipeInfoType {
  id: string,
  title: string,
  description: string,
  image: string,
  user: userInfoType,
  vegetarian: boolean,
  recipeLink: string
}

export interface recipeType {
  recipe: recipeInfoType,
  likedByUser?: boolean
}

export interface subjectType {
  recipes: Array<recipeType>,
  loading: boolean,
  newRecipe: unknown
}

