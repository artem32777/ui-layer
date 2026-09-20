<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const mailReady = ref(false)
</script>

<template>
	<section
		id="contact"
		class="valley__section valley__contact"
	>
		<div class="valley__section-top">
			<span class="valley__label">06 / Начнём с разговора</span>
			<span class="valley__contact-status">
				<span class="valley__status-dot" />
				Открыты к новым проектам
			</span>
		</div>
		<div class="valley__contact-grid">
			<div>
				<h2 class="valley__contact-heading">
					Есть идея?
					<br>
					<span class="valley__accent">
						Давайте
						<br>
						создадим.
					</span>
					<span class="valley__contact-arrow">↗</span>
				</h2>
				<p class="valley__contact-copy">
					Расскажите о своей задаче.
					<br>
					А мы предложим, как её решить.
				</p>
			</div>
			<form
				class="valley__form"
				@submit.prevent="mailReady = true"
			>
				<label
					class="valley__field-label"
					for="valley-name"
				>Как вас зовут?</label>
				<input
					id="valley-name"
					v-model="name"
					class="valley__input"
					name="name"
					autocomplete="name"
					placeholder="Ваше имя"
					required
				>
				<label
					class="valley__field-label"
					for="valley-email"
				>Куда написать?</label>
				<input
					id="valley-email"
					v-model="email"
					class="valley__input"
					name="email"
					type="email"
					autocomplete="email"
					placeholder="Электронная почта"
					required
				>
				<label
					class="valley__field-label"
					for="valley-message"
				>Пара слов о проекте</label>
				<textarea
					id="valley-message"
					v-model="message"
					class="valley__input valley__input--textarea"
					name="message"
					placeholder="Что хотите сделать?"
					required
				/>
				<button
					class="valley__submit"
					type="submit"
				>
					Подготовить письмо
					<span>↗</span>
				</button>
				<p class="valley__form-note">
					Форма подготовит письмо в вашей почте.
					<br>
					Данные не отправляются на сервер.
				</p>
				<div
					v-if="mailReady"
					class="valley__form-result"
					role="status"
				>
					Всё готово. Откройте письмо, проверьте данные и отправьте его из своей почты.
					<a
						class="valley__mail-link"
						:href="`mailto:hello@web-valley.ru?subject=${encodeURIComponent('Новый проект — ' + name)}&body=${encodeURIComponent('Имя: ' + name + '\nEmail: ' + email + '\n\n' + message)}`"
					>
						Открыть почту ↗
					</a>
				</div>
			</form>
		</div>
	</section>
</template>

<style scoped lang="scss">
.valley__status-dot {
	width: 6px;
	height: 6px;
	background: var(--brand);
	border-radius: 50%;
	flex-shrink: 0;
}
.valley__accent {
	color: var(--brand);
}
.valley__section {
	padding: 105px 5%;
	scroll-margin-top: calc(var(--valley-header-height) + 30px);
	@media (max-width: $sm) {
		padding: 68px 6%;
	}
}
.valley__section-top {
	display: flex;
	justify-content: space-between;
	margin-bottom: 47px;
	gap: 20px;
}
.valley__label {
	font-size: 12px;
	color: #d5d6ce;
}
.valley__contact {
	padding-bottom: 110px;
}
.valley__contact-status {
	display: flex;
	gap: 8px;
	align-items: center;
	font-size: 12px;
	@media (max-width: $sm) {
		display: none;
	}
}
.valley__contact-grid {
	display: grid;
	grid-template-columns: 1.15fr 1fr;
	gap: 100px;
	@media (max-width: $sm) {
		grid-template-columns: 1fr;
		gap: 45px;
	}
}
.valley__contact-heading {
	font-size: clamp(59px, 7vw, 104px);
	font-weight: 500;
	line-height: 1;
	letter-spacing: -4px;
	position: relative;
	margin: 0 0 32px;
	@media (max-width: $sm) {
		font-size: 63px;
		letter-spacing: -2px;
	}
}
.valley__contact-arrow {
	position: absolute;
	right: 0;
	bottom: 0;
	font-size: 115px;
	font-weight: 300;
	color: var(--brand);
	@media (max-width: $md) {
		display: none;
	}
}
.valley__contact-copy {
	font-size: 16px;
	line-height: 1.55;
	color: #b6bcae;
	margin: 0;
}
.valley__form {
	padding-top: 9px;
}
.valley__field-label {
	font-size: 12px;
	color: #b6bcae;
	display: block;
	margin-bottom: 8px;
}
.valley__input {
	border: 0;
	border-bottom: 1px solid #515749;
	border-radius: 0;
	background: transparent;
	width: 100%;
	padding: 9px 0 18px;
	color: #f7f7f0;
	font-family: inherit;
	font-size: 20px;
	margin-bottom: 28px;
	outline: none;
	&::placeholder {
		color: #7f8775;
	}
	&:focus {
		border-bottom-color: var(--brand);
	}
}
.valley__input--textarea {
	resize: vertical;
	min-height: 80px;
}
.valley__submit {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: var(--brand);
	border: 1px solid var(--brand);
	color: #111211;
	font-family: inherit;
	font-size: 18px;
	padding: 21px 25px;
	cursor: pointer;
	transition:
		background 0.2s,
		color 0.2s;
	&:hover {
		background: transparent;
		color: var(--brand);
	}
	&:focus-visible {
		outline: 2px solid #fff;
		outline-offset: 5px;
	}
}
.valley__form-note {
	font-size: 11px;
	color: #939c86;
	line-height: 1.5;
	margin: 16px 0 0;
}
.valley__form-result {
	padding-top: 20px;
	font-size: 14px;
	line-height: 1.5;
	color: #d5ddca;
}
.valley__mail-link {
	color: var(--brand);
	display: block;
	margin-top: 8px;
}
</style>
