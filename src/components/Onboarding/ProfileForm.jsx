import { useState } from 'react';
import Button from '../common/Button';
import { ScreenShell } from '../common/Card';
import { useApp } from '../../hooks/useApp';

const MIN_AGE = 6;
const MAX_AGE = 18;

export default function ProfileForm() {
  const { completeProfile } = useApp();
  const [form, setForm] = useState({ gender: 'female', age: '', height: '', weight: '', mealsPerDay: '3' });
  const [errors, setErrors] = useState({});

  function update(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function validate() {
    const next = {};
    const age = Number(form.age);
    const height = Number(form.height);
    const weight = Number(form.weight);

    if (!form.age || Number.isNaN(age)) next.age = '나이를 입력해 주세요';
    else if (age < MIN_AGE || age > MAX_AGE) next.age = `이 서비스는 ${MIN_AGE}~${MAX_AGE}세를 대상으로 해요`;

    if (!form.height || Number.isNaN(height) || height <= 0) next.height = '키를 정확히 입력해 주세요 (cm)';
    if (!form.weight || Number.isNaN(weight) || weight <= 0) next.weight = '몸무게를 정확히 입력해 주세요 (kg)';
    if (!form.mealsPerDay) next.mealsPerDay = '하루 식사 횟수를 선택해 주세요';

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    completeProfile({
      gender: form.gender,
      age: Number(form.age),
      height: Number(form.height),
      weight: Number(form.weight),
      mealsPerDay: Number(form.mealsPerDay),
    });
  }

  return (
    <ScreenShell eyebrow="01 가입 · 목표 설정" title="몇 가지만 알려주세요" subtitle="목표를 계산하는 데만 사용해요">
      <form className="profile-form" onSubmit={handleSubmit} noValidate>
        <fieldset>
          <legend>성별</legend>
          <div className="segmented">
            <label className={form.gender === 'female' ? 'active' : ''}>
              <input type="radio" name="gender" value="female" checked={form.gender === 'female'} onChange={() => update('gender', 'female')} />
              여자
            </label>
            <label className={form.gender === 'male' ? 'active' : ''}>
              <input type="radio" name="gender" value="male" checked={form.gender === 'male'} onChange={() => update('gender', 'male')} />
              남자
            </label>
          </div>
        </fieldset>

        <div className="field-grid">
          <div className="field">
            <label htmlFor="age">나이(세)</label>
            <input id="age" type="number" inputMode="numeric" value={form.age} onChange={(e) => update('age', e.target.value)} />
            {errors.age && <p className="field-error">{errors.age}</p>}
          </div>
          <div className="field">
            <label htmlFor="height">키(cm)</label>
            <input id="height" type="number" inputMode="decimal" value={form.height} onChange={(e) => update('height', e.target.value)} />
            {errors.height && <p className="field-error">{errors.height}</p>}
          </div>
          <div className="field">
            <label htmlFor="weight">몸무게(kg)</label>
            <input id="weight" type="number" inputMode="decimal" value={form.weight} onChange={(e) => update('weight', e.target.value)} />
            {errors.weight && <p className="field-error">{errors.weight}</p>}
          </div>
        </div>

        <fieldset>
          <legend>하루에 몇 끼 기록할까요?</legend>
          <div className="segmented">
            {['2', '3', '4'].map((n) => (
              <label key={n} className={form.mealsPerDay === n ? 'active' : ''}>
                <input type="radio" name="meals" value={n} checked={form.mealsPerDay === n} onChange={() => update('mealsPerDay', n)} />
                {n}끼
              </label>
            ))}
          </div>
          {errors.mealsPerDay && <p className="field-error">{errors.mealsPerDay}</p>}
        </fieldset>

        <Button type="submit" size="lg" fullWidth>
          목표 계산하기
        </Button>
      </form>
    </ScreenShell>
  );
}
