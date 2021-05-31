

import { render } from '../js/component.js'
import { nullData } from '../js/utils.js'

function UserCard(data) {

    const template = `
    <div class="flex-row p-5 pb-0">
        <div class="avatar-40">
            <img src="${data.avatarUrl}" />
        </div>
        <div class="flex-column ml-10">
            <div class="pl-2 ${nullData(data?.login)}">${data?.login}</div>
            <button class="button-xsm">follow</button>
        </div>
    </div>
    `
    
    return render(template)
}

export default UserCard