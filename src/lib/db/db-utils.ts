import {Snowflake} from "discord-api-types";
import User from "$lib/db/models/User";
import Guild from "$lib/db/models/Guild";

export const getUser = async (id: Snowflake) => {
    const uid = id.toString();
    const queryOptions = {
        where: {
            id: uid
        }
    }
    const user: User | null = await User.findOne(queryOptions);
    if (user === null) {
        await User.create({id: uid});
        return await User.findOne(queryOptions);
    } else {
        return user;
    }
}

export const getGuild = async (id: Snowflake) => {
    const gid = id.toString();
    const queryOptions = {
        where: {
            id: gid
        }
    }
    const guild: Guild | null = await Guild.findOne(queryOptions);
    if (guild === null) {
        await Guild.create({id: gid});
        return await Guild.findOne(queryOptions);
    } else {
        return guild;
    }
}