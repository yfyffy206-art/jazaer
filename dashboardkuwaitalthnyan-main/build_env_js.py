#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_env_js.py — توليد assets/js/firebase-env.js للوحة التحكم المستقلة
-----------------------------------------------------------------------
عند نشر اللوحة على استضافة ثابتة (Netlify/Vercel/GitHub Pages) لا يوجد خادم
يحقن `window.__FIREBASE_CONFIG__` في الصفحة، فيولّد هذا السكربت ملفاً يحتوي
إعدادات Firebase العامة فقط:

    window.__FIREBASE_CONFIG__ = { apiKey: "...", ... };

يقرأ القيم من متغيّرات البيئة FIREBASE_* (أو ملف .env محلياً في هذا المجلد).
الإعدادات العامة لـ Firebase ليست سرّية بطبيعتها (تصميم Firebase)، لكن الملف
المولَّد مستثنى من Git ويُولَّد عند البناء من متغيّرات بيئة المنصة.

الاستخدام:
    python3 build_env_js.py
"""
import json
import os

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, 'assets', 'js', 'firebase-env.js')

CONFIG_FIELDS = {
    'apiKey': 'FIREBASE_API_KEY',
    'authDomain': 'FIREBASE_AUTH_DOMAIN',
    'databaseURL': 'FIREBASE_DATABASE_URL',
    'projectId': 'FIREBASE_PROJECT_ID',
    'storageBucket': 'FIREBASE_STORAGE_BUCKET',
    'messagingSenderId': 'FIREBASE_MESSAGING_SENDER_ID',
    'appId': 'FIREBASE_APP_ID',
    'measurementId': 'FIREBASE_MEASUREMENT_ID',
}


def _load_env_file(path):
    try:
        with open(path, encoding='utf-8') as f:
            lines = f.readlines()
    except OSError:
        return
    for line in lines:
        line = line.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        key, value = line.split('=', 1)
        key, value = key.strip(), value.strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in ('"', "'"):
            value = value[1:-1]
        if key and key not in os.environ:
            os.environ[key] = value


def build():
    _load_env_file(os.path.join(ROOT, '.env'))
    cfg = {}
    for key, env_name in CONFIG_FIELDS.items():
        cfg[key] = (os.environ.get(env_name) or os.environ.get('VITE_' + env_name) or '').strip()
    content = ('// مولّد آلياً من متغيّرات البيئة (build_env_js.py) — لا تُعدّله يدوياً\n'
               'window.__FIREBASE_CONFIG__ = ' + json.dumps(cfg, ensure_ascii=False) + ';\n')
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, 'w', encoding='utf-8') as f:
        f.write(content)
    if not cfg.get('apiKey'):
        print('تحذير: FIREBASE_API_KEY فارغ — اضبط متغيّرات البيئة قبل النشر.')
    print('كُتب %s' % os.path.relpath(OUT, ROOT))
    return 0


if __name__ == '__main__':
    raise SystemExit(build())
