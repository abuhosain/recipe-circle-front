import envConfig from "@/src/config/env.confg";

export const getAllRecipes = async () => {
    let fetchOptions = {};
    fetchOptions = {
        cache: "no-cache",
    };
    const res = await fetch(`${envConfig.baseApi}/recipe`, fetchOptions);

    return res.json();
}