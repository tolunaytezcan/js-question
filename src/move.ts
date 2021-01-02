type List = { id: string; name: string; files: { id: string; name: string }[] }[];
export default function move(list: List, source: string, destination: string): List {
  let sourceFile: any;

  //Finding source file
  list.forEach((folder) => {
    if (source === folder.id) {
      throw new TypeError('You cannot move a folder');
    }

    folder.files.forEach((file) => {
      if (destination === file.id) {
        throw new TypeError('You cannot specify a file as the destination');
      }
    });

    let file = folder.files.find((file) => {
      return file.id === source;
    });
    file ? (sourceFile = file) : null;
  });

  //Finding destination folder
  const destinationFolder = list.find((folder) => folder.id === destination);

  //Checking the test scenarios
  if (!sourceFile) {
    throw new TypeError('Source is not a file');
  }
  if (!destinationFolder) {
    throw new TypeError('Destination is not a folder');
  }

  destinationFolder.files.forEach((file) => {
    if (file.id === sourceFile.id) {
      throw new TypeError('The file is already in this folder');
    }
  });

  //Adding and removing operations
  let result = list.map((folder) => {
    //Adding file to destination folder
    if (folder.id === destination) {
      const added = {
        id: folder.id,
        name: folder.name,
        files: [...folder.files, { ...sourceFile }],
      };
      return added;
    }
    //Removing file to source folder
    else {
      const deleted = {
        id: folder.id,
        name: folder.name,
        files: folder.files.filter((file) => file.id !== sourceFile.id),
      };
      return deleted;
    }
  });

  return result;
}
