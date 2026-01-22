//Напишите и типизируйте функцию, выполняющую запрос за данными по переданному URL. Выведите их в консоль в формате: "ID: id, Email: email".

interface IData {
    id: number;
    email: string;
}

const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

const getData = async <T = IData[]>(url:string):Promise<T> => {
  const response = await fetch(url);
  const data = (await response.json()) as IData[];

  return data as T;
}

export default getData<IData[]>(COMMENTS_URL)
    .then(res => {
        console.log(res.map(item => ({
            id: item.id,
            email: item.email
        })))
    })
/**
 * ID: 1, Email: Eliseo...
 * ID: 2, Email: Jayne_Kuhic...
 * ID: 3, Email: Nikita...
 * ID: 4, Email: Lew...
 * ...
 */