export default (inputObject) => ` <div class="printing--areas page_a4 vertical">

<h2 class="text-center"> بانک ملت</h2>
<h2 class="text-center"> تحویل کارت / اصلاح اطلاعات کارت </h2>
<table class="table">
    <tr class="no-border">
        <th colspan="3" class="no-space"> بانک ملت شعبه : ${inputObject.name} </th>
    </tr>
    <tr class="no-border-left">
        <td class="no-space"> کاربر تهیه کننده گزارش :  </td>
        <td class="text-left no-space"> تاریخ تهیه گزارش : ${new Date().toLocaleDateString("fa")}
        </td>
    </tr>
</table>
<table border="1" class="table">
    <tr class="no-border">
        <th colspan="3"> مشخصات صاحب حساب </th>
    </tr>
    <tr class="no-border">
        <td> نام شرکت </td>
        <td>${inputObject.family}</td>
        <td></td>
    </tr>
    <tr class="no-border">
        <td> شماره مشتری </td>
        <td></td>
        <td></td>
    </tr>
    <tr class="no-border">
        <td> شماره ثبت شرکت </td>
        <td></td>
        <td></td>
    </tr>
    <tr class="no-border-left">
        <td> شماره روزنامه ثبت شرکت </td>
        <td></td>
        <td>
            <div class="vertical-center">
                <span> شماره همراه </span>
                <div class="mobile-box"></div>
            </div>
        </td>
    </tr>
    <tr class="text-center no-border-left">
        <td>شماره حساب اصلی کارت</td>
        <td>نوع حساب</td>
        <td></td>
    </tr>
    <tr class="text-center">
        <td>شماره حساب</td>
        <td>نوع حساب</td>
        <td>وضعیت اتصال</td>
    </tr>
    <tr class="more-space">
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>
<table class="table">
    <tr class="no-border">
        <td colspan="3"> کارت مغناطیسی به شماره  با سقف برداشت  و مشخصات فوق در تاریخ ${new Date().toLocaleDateString("fa")} به اینجانب 
            صاحب
            حساب تحویل گردید. </td>
    </tr>
    <tr class="no-border">
        <td colspan="3" class="text-left"> <b>محل امضا / تایید صاحب حساب</b> </td>
    </tr>
</table>

</div>`;