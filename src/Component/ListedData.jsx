import React from 'react'
import { useQueryClient } from 'react-query'

function ListedData() {
    const query = useQueryClient();
    const user = query.getQueryData(['users'])
    console.log(user, 'liissssted');

    return (
        <div>
            Listed Users
            <ul>
                {user?.map((user) => (
                    <li key={user.id}>
                        {user?.first_name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListedData
