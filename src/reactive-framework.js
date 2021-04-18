/*

  minimum necessary stuff for a reactive framework

  virtual DOM: used to compare against actual DOM

  comparison method on setInterval tick: walk the AST of each and check each node

  if node.isEqualNode(node) skip it
  else swap it

  ***

  component: what's in a component?

  minimally, it's an observer that generates subtrees and swaps its contents when changes occur

  it listens for changes by subscribing to an observable

  ***

  a reactive framework is probably observables all the way down

  ***

  hooks are called whenever a component re-renders

  renders are triggered whenever an observer's next method would generate a new DOM subtree compared to the previous subtree

  OR --

  we left the comparison method sort that out and we just swap the contents at the comparison tick regardless of whether changes have occurred



  we can return a generator func from closure
  that holds on to previous data values
  and check previous DOM / previous props by checking
  the var that we've stored previous in

  const returnComparisonFunc = (initDOM) => {

    let prevDOM = initDOM

    return (newDOM) => {

      if (prevDOM !== newDOM) {
            // set change flag here to alert comparison func
            console.log('DOM change!')

            prevDOM = newDOM;
            return newDOM
        }

        return prevDOM;
    }
  }

  downstream components will re-render based on their
  subscription -- they'll receive a new DOM string
  and evaluate it with swapDOM():


  const initDOM = ** init DOM string goes here **
  const swapDOM = returnComparisonFunc(initDOM)


  thisComponent is the observer instance
  whenever this component's .next() is triggered:

  .next doesn't need to be async --> it receives already-resolved data from its observableInstance

  // each component.next() call expects an arg
  // this arg is an array of objects structured { key, data }

  thisComponent.next(

    [{
      key: identifier -> by UUIDV4 probably safest
      data: // this is what will be swapped out according to the key/identifier
    }, ...]
  ) {



  }

*/
