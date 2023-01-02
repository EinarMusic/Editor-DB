<template>
    <div class="wrap-break-v">
        <div class="add-cut">
            <div class="input">
                <slot name="first"></slot>
            </div>
            <span class="between">/</span>
            <div class="input">
                <slot name="second"></slot>
            </div>
            <div class="btn-add">
                <slot name="btn"></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
.add-cut {
    display: flex;
    align-items: center;
}
.between {
    margin: 0 10px;

    font-size: 20px;
    color: #5e5e5f;
}
.btn-add {
    margin: 0 20px;
}
</style>