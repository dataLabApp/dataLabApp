import storage from 'electron-json-storage'

export function clearCachedData(){
  storage.clear(function(err){
    if(err){
      console.log("couldn't clear cached data from storage")
      throw err
    }
  })
}
