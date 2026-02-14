from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'},
    )
    password_confirm = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
    )

    class Meta:
        model = User
        fields = [
            'uuid', 'username', 'email', 'first_name', 'last_name',
            'role', 'phone_number', 'password', 'password_confirm',
        ]
        read_only_fields = ['uuid']

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError(
                {"password_confirm": "Passwords do not match."}
            )
        return attrs

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = [
            'uuid', 'username', 'email', 'first_name', 'last_name',
            'role', 'phone_number', 'avatar', 'date_of_birth',
            'is_active_tenant', 'full_name', 'created_at',
        ]
        read_only_fields = ['uuid', 'role', 'is_active_tenant', 'created_at']


class UserMinimalSerializer(serializers.ModelSerializer):
    """Lightweight serializer for nested representations."""
    full_name = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = ['uuid', 'username', 'full_name', 'email', 'phone_number', 'role']
        read_only_fields = fields
