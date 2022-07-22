export const randomState = () => Math.floor(Math.random() * 5) + 1

export const calcHeight = length => {
  const min = 2, max = length / 20
  return `${max < min ? min : max}em`
}
