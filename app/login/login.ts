'use server';

export async function login(prevState: any, formData: FormData) {
  console.log(prevState);
  await new Promise(resolve => setTimeout(resolve, 3000));
  return {
    errors: ['wrong password', 'Short password']
  };
}
