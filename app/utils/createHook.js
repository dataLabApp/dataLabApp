
export const createHook = (comp, elem, statename) => {
  let elems = new Map(),
    interval
  const updateState = () => {
    comp.setState({[statename]: elem.toReact()})
  }
  setTimeout(updateState)
  comp.isAnimating = () => !!interval
  return (transition) => {
    // As the various transitions begin, record the elements which are
    // animating and start running updateState every 16ms
    transition.each('start', (e) => {
      elems.set(e, (elems.get(e) || new Set()).add(transition.id))
      interval = interval || setInterval(updateState, 16)
    })
    // As the various transitions end, clean up the record of animating elements
    // until it ends up being empty as everything has finished
    transition.each('end', (e) => {
      const anims = elems.get(e)
      anims.delete(transition.id)
      if (anims.size) {
        elems.set(e, anims)
      } else {
        elems.delete(e)
      }
      // If there are no elements left that are animating, stop running
      // updateState every 16ms
      if (!elems.size) {
        interval = clearInterval(interval)
      }
    })
  }
}
