/*
Evaluates the prefix expression and calculates the result for the given
variable values.

@param {String} expression - the prefix expression to evaluate.
@param {Object} variables - all the variables in the expression are the keys of
    this object and their corresponding values are the values the variable
    should take
@returns {Number|null} the numerical result of the expression evaluated with the
    given variable values. If the expression is invalid, it will return `null`.
*/
function isNormalInteger(str) {
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0 && parseInt(n).toString(10);
}

function result_expression(expression, variables) {
    //Enter your code here
    let constraints  = ['+', '-', '*', '/']
    let vals = []
    let ops = []
    main_expression = expression.replace(/ /g, ' ')
    main_expression.forEach((item) => {
        if (variables.hasOwnProperty(item)){
            vals.push(parseInt(variables[item]).toString(10))
        }
        else if(typeof(item) === 'number'){

            if (isNormalInteger(item))
                vals.push(parseInt(item).toString(10))
        }
        else if(constraints.includes(String(item))){
            ops.push(item)
        }
        else if(typeof(item) === 'undefined')
            return null

    })
    let ops_length = ops.length
    let vals_length =  vals.length
    vals.reverse()
    var temp_res = 0
    if ((vals_length - ops_length) === 2)
        return null
    else{
        for(var i=0; i <= ops.length; ++i){
            if (i === 0){
                op = ops.pop()
                v1 = vals.pop()
                v2 = vals.pop()
                temp_res = eval(`${v1} ${op} ${v2}`)
            }
            else{
                op = ops.pop()
                v2 = vals.pop()
                temp_res = eval(`${temp_res} ${op}  ${v2}`)
            }



        }


    }

    return temp_res


}
process.stdin.resume();
