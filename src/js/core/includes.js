import $ from 'jquery'

const loadHtmlsuccessCallbacks = []

export function onLoadHtmlSuccess(callback){
    if(!loadHtmlsuccessCallbacks.includes(callback)){
        loadHtmlsuccessCallbacks.push(callback)
    }
}

function loadIncludes(parent){
    if(!parent) parent = 'body'
    $(parent).find('[wm-include]').each(function(i,e){
        const url = $(e).attr('wm-include')
        $.ajax({
            url,
            success(data){
                $(e).html(data)
                $(e).removeAttr('wm-include')

                loadHtmlsuccessCallbacks.forEach(callback=>callback(data))
                loadIncludes(e)
            }
        })
    })
}

loadIncludes()